using LoanExam.CalculateEndpoints;

namespace LoanExam.ActionPointsHandler;

public class DepositHandler
{
    public static int DepositActionPoint(Deposit loanInfoDeposit)
    {
        int points = 0;
        points += loanInfoDeposit switch
        {
            Deposit.Property => 14,
            Deposit.NewCar => 8,
            Deposit.OldCar => 3,
            Deposit.Guarantee => 12,
            Deposit.None => 0,
            _ => throw new ArgumentOutOfRangeException(nameof(loanInfoDeposit), loanInfoDeposit, null)
        };

        return points;
    }
}