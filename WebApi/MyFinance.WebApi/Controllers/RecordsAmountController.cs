using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyFinance.Business.SearchModelImplementations;
using MyFinance.Business.SearchParametersImplementations;
using MyFinance.Core.Abstractions.IdentityManagers;
using MyFinance.Core.Abstractions.Services;
using MyFinance.WebApi.Authorization;
using MyFinance.WebApi.Filters.ExceptionFilters;
using MyFinance.WebApi.Models.General.Responses;
using MyFinance.WebApi.Models.RecordsCount.Request;
using MyFinance.WebApi.Models.RecordsSum.Request;
using Serilog;

namespace MyFinance.WebApi.Controllers
{
    /// <summary>
    /// Controller that provides API endpoints for the RecordsAmount resource.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Permission("UserOnly")]
    [TypeFilter(typeof(InternalServerErrorFilter))]
    public class RecordsAmountController : ControllerBase
    {
        private readonly IRecordService _recordService;
        private readonly IMapper _mapper;
        private readonly IUserManager _userManager;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="recordService">record service from IOC</param>
        /// <param name="userManager">user manager from IOC</param>
        /// <param name="mapper">mapper from IOC</param>
        public RecordsAmountController(IRecordService recordService, 
            IMapper mapper, 
            IUserManager userManager)
        {
            _recordService = recordService;
            _mapper = mapper;
            _userManager = userManager;
        }

        /// <summary>
        ///     Get amount of records specified search model from the storage.
        /// </summary>
        /// <param name="model">search model</param>
        /// <returns>Amount of records matching search model.</returns>
        /// <response code="200">Returns a amount of records matching search model.</response>
        /// <response code="500">Unexpected error on the server side.</response>
        [HttpGet]
        [TypeFilter(typeof(BadRequestExceptionFilter))]
        [ProducesResponseType(typeof(double), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetRecordsAmount([FromQuery] GetRecordsAmountRequestModel model)
        {

                var searchParams = _mapper.Map<RecordsAmountSearchModel>(model);

                var userId = _userManager.GetUserId();
                searchParams.User = new UserSearchParameters { UserId = userId };

                var response = await _recordService
                    .GetRecordsAmountBySearchParametersAsync(searchParams);

                return Ok(response);
        }
    }
}
