namespace LoanExam.CalculateEndpoints;

public class Request
{
    public Passport Passport { get; set; }
    public Fullname Fullname { get; set; }
    public PersonalInfo PersonalInfo { get; set; }
    public LoanInfo LoanInfo { get; set; }
}

public class LoanInfo
{
    public int LoanSum { get; set; }
    public Purpose Purpose { get; set; }
    public bool OtherLoans { get; set; }
    public Deposit Deposit { get; set; }
}

public enum Deposit
{
    Property=0,
    NewCar=1,
    OldCar=2,
    Guarantee=3,
    None=4
}

public enum Purpose
{
    ConsumerLoan=0,
    Property=1,
    Reloaning=2
}

public class PersonalInfo
{
    public int Age { get; set; }
    public bool CriminalRecord { get; set; }
    public  Employment Employment { get; set; }
    
}

public enum Employment
{
    EmploymentContract=0,
    IndividualEntrepreneur=1,
    Freelancer =2,
    Retired=3,
    Unemployed=4
}

public class Fullname
{
    public string Surname { get; set; }
    public string Name { get; set; }
    public string Patronymic { get; set; }
}

public class Passport
{
    public string Series { get; set; }
    public string Number { get; set; }
    public string IssuedBy { get; set; }
    public DateTime IssueDate { get; set; }
    public string PropiskaInfo { get; set; }
}