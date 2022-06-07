using LoanExam.CalculateEndpoints.Endpoint;

namespace LoanExam.Handlers.ResponseHandler;

public class ResponseCreate
{
    public static Response LoanResult(int points)
    {
        double percent = 0;
        bool loanConfirmed = false;
        switch (points)
        {
            case > 80 and <= 83:
                percent = 30;
                loanConfirmed = true;
                break;
            case >= 84 and <= 87:
                percent = 26;
                loanConfirmed = true;
                break;
            case >= 88 and <= 91:
                percent = 22;
                loanConfirmed = true;
                break;
            case >= 92 and <= 95:
                percent = 19;
                loanConfirmed = true;
                break;
            case >= 96 and <= 99:
                percent = 15;
                loanConfirmed = true;
                break;
            case 100:
                percent = 12.5;
                loanConfirmed = true;
                break;
        }

        return new Response
        {
            LoanConfirmed = loanConfirmed,
            Percent = percent,
            Points = points
        };
    }
}