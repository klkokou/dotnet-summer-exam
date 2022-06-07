using LoanExam.Shared;
using FluentValidation;
using LoanExam.ActionPointsHandler;
using LoanExam.Handlers.ActionPointsHandler;
using LoanExam.Handlers.ResponseHandler;
using MinimalApi.Endpoint;

namespace LoanExam.CalculateEndpoints.Endpoint;

public class Endpoint : IEndpoint<IResult, Request>
{
    private readonly IValidator<Request> _validator;

    public Endpoint(IValidator<Request> validator)
    {
        _validator = validator;
    }

    public async Task<IResult> HandleAsync(Request request)
    {
        var result = await _validator.ValidateAsync(request);

        if (!result.IsValid)
        {
            return Results.BadRequest(result.Errors);
        }

        var points = 0;
        points += AgeHandler.AgeActionPoint(request.PersonalInfo.Age, request.LoanInfo.Deposit, request.LoanInfo.LoanSum);
        points += CriminalRecordHandler.CriminalRecordActionPoint(request.Passport);
        points += EmploymentHandler.EmploymentActionPoint(request.PersonalInfo.Employment, request.PersonalInfo.Age);
        points += PurposeHandler.PurposeActionPoint(request.LoanInfo.Purpose);
        points += DepositHandler.DepositActionPoint(request.LoanInfo.Deposit);
        points += OtherLoansHandler.OtherLoansActionPoint(request.LoanInfo.OtherLoans, request.LoanInfo.Purpose);
        points += LoanSumHandler.LoanSumActionPoint(request.LoanInfo.LoanSum);
        var response = ResponseCreate.LoanResult(points);

        return Results.Ok(response);
    }
    

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.Map(RouteConstants.CalculateEndpoints.CalculateLoan, HandleAsync);
    }
}