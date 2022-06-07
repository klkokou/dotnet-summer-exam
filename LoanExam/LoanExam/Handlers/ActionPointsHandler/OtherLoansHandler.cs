using LoanExam.CalculateEndpoints;

namespace LoanExam.ActionPointsHandler;

public class OtherLoansHandler
{
    public static int OtherLoansActionPoint(bool loanInfoOtherLoans, Purpose loanInfoPurpose)
    {
        int points = 0;
        if (loanInfoOtherLoans)
        {
            points += 0;
        }
        else
        {
            points += loanInfoPurpose == Purpose.Reloaning ? 0 : 15;
        }

        return points;
    }
}