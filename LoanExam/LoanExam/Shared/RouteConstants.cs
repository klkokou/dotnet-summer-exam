namespace LoanExam.Shared;

public static class RouteConstants
{
    private const string Calculate = "calculate";
    
    public static class CalculateEndpoints
    {
        public const string CalculateLoan = $"{Calculate}/{nameof(CalculateEndpoints)}/{nameof(CalculateLoan)}";
    }
}