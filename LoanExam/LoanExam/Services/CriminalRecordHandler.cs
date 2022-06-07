using LoanExam.CalculateEndpoints;

namespace LoanExam.Handlers.CriminalHistoryHandler;

public class CriminalRecordHandler
{
    public static bool CheckCriminalRecord(Passport passport)
    {
        var propiskaLength = passport.PropiskaInfo.Length;

        bool criminalStatus;
        
        switch (propiskaLength % 2 == 0)
        {
            case true:
                criminalStatus = true;
                break;
            case false:
                criminalStatus = false;
                break;
        }

        return  criminalStatus;
    }
}