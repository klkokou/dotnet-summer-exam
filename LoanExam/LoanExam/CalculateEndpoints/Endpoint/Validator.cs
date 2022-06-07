using FluentValidation;

namespace LoanExam.CalculateEndpoints.Endpoint;

// ReSharper disable once UnusedType.Global
public class Validator : AbstractValidator<Request>
{
    public Validator()
    {
        RuleFor(r => r.LoanInfo!.LoanSum)
            .Cascade(CascadeMode.Stop)
            .GreaterThan(0)
            .LessThanOrEqualTo(10_000_000)
            .When((c, _) => c.LoanInfo is not null);

        RuleFor(r => r.PersonalInfo!.Age)
            .Cascade(CascadeMode.Stop)
            .GreaterThanOrEqualTo(21)
            .LessThanOrEqualTo(72)
            .When((c, _) => c.PersonalInfo is not null);

        RuleFor(r => r.Fullname!.Surname)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(2, 50)
            .When((c, _) => c.Fullname is not null);
        
        RuleFor(r => r.Fullname!.Name)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(2, 50)
            .When((c, _) => c.Fullname is not null);
        
        RuleFor(r => r.Fullname!.Patronymic)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(2, 50)
            .When((c, _) => c.Fullname is not null);

        RuleFor(r => r.Passport!.Number)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(6)
            .When((c, _) => c.Passport is not null);
        RuleFor(r => r.Passport!.Series)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(4)
            .When((c, _) => c.Passport is not null);

        RuleFor(r => r.Passport!.PropiskaInfo)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(5, 150)
            .When((c, _) => c.Passport is not null);
        
        
        RuleFor(r => r.Passport!.IssuedBy)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Length(5, 150)
            .When((c, _) => c.Passport is not null);

        RuleFor(r => r.Passport!.IssueDate)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Must(issueDate => issueDate < DateTime.Now)
            .WithMessage("Issue date should be less.")
            .When((c, _) => c.Passport is not null);
    }
}