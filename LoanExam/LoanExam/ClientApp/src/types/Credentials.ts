import {Fullname} from "./FullName";
import {Passport} from "./Passport";
import {PersonalInfo} from "./PersonalInfo";
import {LoanInfo} from "./LoanInfo";

export type Credentials = {
    fullname: Fullname,
    passport: Passport,
    personalInfo: PersonalInfo,
    loanInfo: LoanInfo
}