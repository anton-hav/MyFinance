using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MyFinance.Business.ServiceImplementations;
using MyFinance.Core.Abstractions.IdentityManagers;
using MyFinance.Core.Abstractions.Services;
using MyFinance.Data.Abstractions;
using MyFinance.Data.Abstractions.Repositories;
using MyFinance.Data.Repositories;
using MyFinance.Data.Repositories.Repositories;
using MyFinance.DataBase;
using MyFinance.DataBase.Entities;
using MyFinance.WebApi.Authorization;
using MyFinance.WebApi.IdentityManagers;
using MyFinance.WebApi.Policies;
using MyFinance.WebApi.Utils;
using Serilog;
using Serilog.Events;

namespace MyFinance.WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add Serilog as default Logger
        builder.Host.UseSerilog((ctx, lc) => lc
            .WriteTo.Console()
            .WriteTo.File(GetPathToLogFile(),
                LogEventLevel.Information));

        // Add services to the container.
        var myCorsPolicyName = "ReactApp";
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(myCorsPolicyName, policyBuilder =>
            {
                policyBuilder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
            });
        });

        // Add DbContext
        var connectionString = builder.Configuration.GetConnectionString("Default");
        builder.Services.AddDbContext<MyFinanceDbContext>(
            optionBuilder => optionBuilder.UseSqlServer(connectionString));

        // Add controllers
        builder.Services.AddControllers();

        // Add AutoMapper
        builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        // Add Swagger
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            options.IncludeXmlComments(builder.Configuration["APIXmlDocumentation"]);
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] { }
                }
            });
        });

        // Add authentication by JWT bearer
        builder.Services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
                {
                    // Only for develop environment.
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = builder.Configuration["Token:Issuer"],
                        ValidAudience = builder.Configuration["Token:Issuer"],
                        IssuerSigningKey =
                            new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(builder.Configuration["Token:JwtSecret"])),
                        ClockSkew = TimeSpan.Zero
                    };
                }
            );

        // Add Context Accessor
        // Required to implement the IUserManager
        builder.Services.AddHttpContextAccessor();

        // Add business services
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IRoleService, RoleService>();
        builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();
        builder.Services.AddScoped<IJwtUtil, JwtUtilSha256>();
        builder.Services.AddScoped<ICategoryService, CategoryService>();
        builder.Services.AddScoped<IRecordService, RecordService>();

        // Add identity managers
        builder.Services.AddScoped<IUserManager, UserManager>();

        // Add repositories
        builder.Services.AddScoped<IRepository<User>, Repository<User>>();
        builder.Services.AddScoped<IRepository<Role>, Repository<Role>>();
        builder.Services.AddScoped<IRepository<RefreshToken>, Repository<RefreshToken>>();
        builder.Services.AddScoped<IRepository<Category>, Repository<Category>>();
        builder.Services.AddScoped<IRepository<Record>, Repository<Record>>();
        // It is an example of the addition repository.
        // You can find more information in the description of the repository implementation.
        builder.Services.AddScoped<IRecordRepository, RecordRepository>();
        builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

        // Add authorization handlers and provider.
        builder.Services.AddScoped<IAuthorizationHandler, PermissionRequirementHandler>();
        builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();


        var app = builder.Build();

        app.UseRouting();
        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseAuthentication();
        app.UseCors(myCorsPolicyName);
        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }

    /// <summary>
    ///     Returns the path for log file recording.
    /// </summary>
    /// <returns>A string whose value contains a path to the log file</returns>
    private static string GetPathToLogFile()
    {
        var sb = new StringBuilder();
        sb.Append(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location));
        sb.Append(@"\logs\");
        sb.Append($"{DateTime.Now:yyyyMMddhhmmss}");
        sb.Append("data.log");
        return sb.ToString();
    }
}