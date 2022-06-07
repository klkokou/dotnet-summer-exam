using LoanExam.CalculateEndpoints;

namespace LoanExam.ActionPointsHandler;

public class AgeHandler
{
    public static int AgeActionPoint(int age, Deposit deposit, int loanInfoLoanSum)
    {
        int points = 0;
        switch (age)
        {
            case >= 21 and <= 28:
                points += loanInfoLoanSum switch
                {
                    < 1_000_000 => 12,
                    > 3_000_000 => 0,
                    _ => 9
                };
                break;
            case >= 29 and <= 59:
                points += 14;
                break;
            case >= 60 and <= 72:
                points += deposit switch
                {
                    Deposit.None => 0,
                    _ => 8
                };
                break;
        }

        return points;
    }
}