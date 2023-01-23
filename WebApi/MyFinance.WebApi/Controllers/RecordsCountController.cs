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
using Serilog;

namespace MyFinance.WebApi.Controllers
{
    /// <summary>
    /// Controller that provides API endpoints for the RecordsCount resource.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Permission("UserOnly")]
    [TypeFilter(typeof(InternalServerErrorFilter))]
    public class RecordsCountController : ControllerBase
    {
        private IRecordService _recordService;
        private readonly IMapper _mapper;
        private readonly IUserManager _userManager;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="recordService">record service from IOC</param>
        /// <param name="userManager">user manager from IOC</param>
        /// <param name="mapper">mapper from IOC</param>
        public RecordsCountController(IRecordService recordService, 
            IMapper mapper, 
            IUserManager userManager)
        {
            _recordService = recordService;
            _mapper = mapper;
            _userManager = userManager;
        }

        /// <summary>
        ///     Get records count specified search model from the storage.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>number of records matching search model.</returns>
        /// <response code="200">Returns a number of records matching search model.</response>
        /// <response code="500">Unexpected error on the server side.</response>
        [HttpGet]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetGoodsCount([FromQuery] GetRecordsCountRequestModel model)
        {
            try
            {
                var searchParams = _mapper.Map<RecordsCountSearchModel>(model);

                var userId = _userManager.GetUserId();
                searchParams.User = new UserSearchParameters { UserId = userId };

                var response = await _recordService
                    .GetRecordsCountBySearchParametersAsync(searchParams);

                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
                return BadRequest(new ErrorModel { Message = ex.Message });
            }
            catch (Exception ex)
            {
                Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
                return StatusCode(500, new ErrorModel { Message = "Unexpected error on the server side." });
            }
        }
    }

    
}
