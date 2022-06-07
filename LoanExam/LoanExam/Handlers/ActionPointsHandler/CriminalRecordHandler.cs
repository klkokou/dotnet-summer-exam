using LoanExam.CalculateEndpoints;

namespace LoanExam.Handlers.ActionPointsHandler;

public class CriminalRecordHandler
{
    public static  int CriminalRecordActionPoint(Passport passport)
    {
        var criminalRecord =  CriminalHistoryHandler.CriminalRecordHandler.CheckCriminalRecord(passport);
        return criminalRecord ? 0 : 15;
    }
}