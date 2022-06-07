using LoanExam.CalculateEndpoints;

namespace LoanExam.ActionPointsHandler;

public class PurposeHandler
{
    public static int PurposeActionPoint(Purpose loanInfoPurpose)
    {
        int points = 0;
        points += loanInfoPurpose switch
        {
            Purpose.ConsumerLoan => 14,
            Purpose.Property => 8,
            Purpose.Reloaning => 12,
            _ => throw new ArgumentOutOfRangeException(nameof(loanInfoPurpose), loanInfoPurpose, null)
        };

        return points;
    }
}