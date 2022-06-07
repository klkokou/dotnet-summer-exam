using LoanExam.CalculateEndpoints;

namespace LoanExam.ActionPointsHandler;

public class EmploymentHandler
{
    public static int EmploymentActionPoint(Employment personalInfoEmployment, int personalInfoAge)
    {
        int points = 0;
        switch (personalInfoEmployment)
        {
            case Employment.EmploymentContract:
                points += 14;
                break;
            case Employment.IndividualEntrepreneur:
                points += 12;
                break;
            case Employment.Freelancer:
                points += 8;
                break;
            case Employment.Retired:
                points += personalInfoAge switch
                {
                    < 70 => 5,
                    _ => 0
                };
                break;
        }

        return points;
    }
}