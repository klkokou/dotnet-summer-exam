namespace LoanExam.ActionPointsHandler;

public class LoanSumHandler
{
    public static int LoanSumActionPoint(int loanInfoLoanSum)
    {
        int points = 0;
        points += loanInfoLoanSum switch
        {
            > 0 and <= 1_000_000 => 12,
            >= 1_000_001 and <= 5_000_000 => 14,
            >= 5_000_001 and <= 10_000_000 => 8,
            _ => throw new ArgumentOutOfRangeException(nameof(loanInfoLoanSum), loanInfoLoanSum, null)
        };

        return points;
    }
}