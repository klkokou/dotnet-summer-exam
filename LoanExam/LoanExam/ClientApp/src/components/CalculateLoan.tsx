import {
    Button,
    Grid,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select, MenuItem, FormHelperText
} from "@mui/material";
import {Purpose} from "../types/Purpose";
import {Employment} from "../types/Employment";
import {Deposit} from "../types/Deposit";
import {DatePicker} from "@mui/x-date-pickers";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import React, {useState} from "react";
import axios from "axios";
import {Credentials} from "../types/Credentials";

type Inputs = {
    surname: string,
    name: string,
    patronymic: string,

    series: number,
    number: number,
    issuedBy: string,
    issueDate: Date | null,
    propiskaInfo: string,

    age: number,
    criminalrecord: boolean,
    employment: Employment,

    loansum: number,
    purpose: Purpose,
    otherloans: boolean,
    deposit: Deposit
}


export function CalculateLoan() {
    const [checkedCriminalRecord, setCheckedCriminalRecord] = useState(false);
    const [checkedOtherLoans, setCheckedOtherLoans] = useState(false);
    const {
        control,
        register,
        formState: {errors},
        handleSubmit
    } = useForm<Inputs>({defaultValues: {issueDate: null}});

    const [responseString, setResponseString] = useState('');

    const handleCriminalRecordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedCriminalRecord(event.target.checked);
    };
    const handleOtherLoansChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedOtherLoans(event.target.checked);
    };

    const submit: SubmitHandler<Inputs> = async (data) => {
        try {
            const credentials: Credentials = {
                fullname: {
                    surname: data.surname,
                    name: data.name,
                    patronymic: data.patronymic,
                },
                loanInfo: {
                    loansum: data.loansum,
                    purpose: Purpose[data.purpose],
                    otherloans: checkedOtherLoans,
                    deposit: Deposit[data.deposit]
                },
                passport: {
                    series: data.series,
                    number: data.number,
                    issuedBy: data.issuedBy,
                    issueDate: data.issueDate,
                    propiskaInfo: data.propiskaInfo,
                },
                personalInfo: {
                    age: data.age,
                    criminalrecord: checkedCriminalRecord,
                    employment: Employment[data.employment],
                }
            }
            const response = await axios.post('calculate/CalculateEndpoints/CalculateLoan', credentials);
            if (response.data.loanConfirmed) {
                setResponseString("Loan confirmed! Your percent: " + response.data.percent + ". Your points: " + response.data.points)
            } else {
                setResponseString("Not today :( Your points: " + response.data.points)
            }
            console.log(response.data)

        } catch
            (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <Typography sx={{mb: 3}} variant="h6">Full name</Typography>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} sx={{marginBottom: "15px"}}>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            inputProps={{maxLength: 50}}
                            error={!!errors.surname && !!errors.surname.message}
                            helperText={errors.surname?.message}
                            label={"Surname"}
                            {...register("surname", {
                                required: {value: true, message: "Surname required"},
                                minLength: {value: 1, message: "Min length - 1"},
                                maxLength: {value: 50, message: "Max length - 50"},
                                pattern: {value: /^[^\\d\\W]+$/, message: "Only letters"}
                            })}/>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            inputProps={{maxLength: 50}}
                            error={!!errors.name && !!errors.name.message}
                            helperText={errors.name?.message}
                            label={"Name"}
                            {...register("name", {
                                required: {value: true, message: "Name required"},
                                minLength: {value: 1, message: "Min length - 1"},
                                maxLength: {value: 50, message: "Max length - 50"},
                                pattern: {value: /^[^\\d\\W]+$/, message: "Only letters"}
                            })}/>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            inputProps={{maxLength: 50}}
                            error={!!errors.patronymic && !!errors.patronymic.message}
                            helperText={errors.patronymic?.message}
                            label={"Patronymic"}
                            {...register("patronymic", {
                                required: {value: true, message: "Patronymic required"},
                                minLength: {value: 1, message: "Min length - 1"},
                                maxLength: {value: 50, message: "Max length - 50"},
                                pattern: {value: /^[^\\d\\W]+$/, message: "Only letters"}
                            })}/>
                    </Grid>
                </Grid>
                <Typography sx={{mb: 4}} variant="h6">Passport</Typography>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} sx={{marginBottom: "15px"}}>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            inputProps={{maxLength: 4}}
                            error={!!errors.series && !!errors.series.message}
                            helperText={errors.series?.message}
                            label={"Series"}
                            type={"number"}
                            {...register("series", {
                                required: {value: true, message: "Series required"},
                                minLength: {value: 4, message: "Length -4"},
                                maxLength: {value: 4, message: "Length -4"},
                                min: {value: 1000, message: "Min - 1000"},
                                max: {value: 9999, message: "Max - 9999"},
                            })}/>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            inputProps={{maxLength: 6}}
                            type={"number"}
                            error={!!errors.number && !!errors.number.message}
                            helperText={errors.number?.message}
                            label={"Number"}
                            {...register("number", {
                                minLength: {value: 6, message: "Length -6"},
                                maxLength: {value: 6, message: "Length -6"},
                                required: {value: true, message: "Number required"},
                                min: {value: 100000, message: "Min - 100000"},
                                max: {value: 999999, message: "Max - 999999"},
                            })}/>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            inputProps={{maxLength: 150}}
                            error={!!errors.issuedBy && !!errors.issuedBy.message}
                            helperText={errors.issuedBy?.message}
                            label={"Issued by"}
                            {...register("issuedBy", {
                                required: {value: true, message: "Issued by required"},
                                minLength: {value: 1, message: "Min length - 1"},
                                maxLength: {value: 150, message: "Max length - 150"},
                            })}/>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Controller
                            name={"issueDate"}
                            control={control}
                            rules={{
                                required: {value: true, message: "Required"},
                            }}
                            render={({field}) => (
                                <DatePicker
                                    maxDate={new Date()}
                                    mask={"__.__.____"}
                                    label={"Issue date"}
                                    InputProps={{
                                        error: !!errors.issueDate,
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            helperText={errors.issueDate?.message}
                                            {...params}
                                        />
                                    )}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            inputProps={{maxLength: 150}}
                            error={!!errors.propiskaInfo && !!errors.propiskaInfo.message}
                            helperText={errors.propiskaInfo?.message}
                            label={"Propiska Info"}
                            {...register("propiskaInfo", {
                                required: {value: true, message: "Propiska info required"},
                                minLength: {value: 1, message: "Min length - 1"},
                                maxLength: {value: 150, message: "Max length - 150"},
                            })}/>
                    </Grid>
                </Grid>
                <Typography sx={{mb: 4}} variant="h6">Personal info</Typography>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} sx={{marginBottom: "15px"}}>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            inputProps={{maxLength: 3}}
                            type={"number"}
                            error={!!errors.age && !!errors.age.message}
                            helperText={errors.age?.message}
                            label={"Age"}
                            {...register("age", {
                                required: {value: true, message: "Age required"},
                                min: {value: 21, message: "Min - 21"},
                                max: {value: 72, message: "Max - 72"},
                            })}/>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkedCriminalRecord}
                                    onChange={handleCriminalRecordChange}
                                    inputProps={{"aria-label": "controlled"}}
                                />
                            }
                            label="Criminal record"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Controller
                            name={"employment"}
                            control={control}
                            rules={
                                {required: {value: true, message: "Employment required"},}
                            }
                            render={({field}) => (
                                <FormControl fullWidth error={!!errors.employment}>
                                    <InputLabel>Employment</InputLabel>
                                    <Select value={field.value}
                                            label={"Employment"}
                                            onChange={field.onChange}>
                                        <MenuItem value={"EmploymentContract"}
                                                  key={"EmploymentContract"}>{"Employment Contract"}</MenuItem>
                                        <MenuItem value={"IndividualEntrepreneur"}
                                                  key={"IndividualEntrepreneur"}>{"Individual Entrepreneur"}</MenuItem>
                                        <MenuItem value={"Freelancer"} key={"Freelancer"}>{"Freelancer"}</MenuItem>
                                        <MenuItem value={"Retired"} key={"Retired"}>{"Retired"}</MenuItem>
                                        <MenuItem value={"Unemployed"} key={"Unemployed"}>{"Unemployed"}</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.employment?.message}</FormHelperText>
                                </FormControl>
                            )}/>
                    </Grid>
                </Grid>
                <Typography sx={{mb: 4}} variant="h6">Loan info</Typography>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} sx={{marginBottom: "15px"}}>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            error={!!errors.loansum && !!errors.loansum.message}
                            helperText={errors.loansum?.message}
                            label={"Loansum"}
                            type={"number"}
                            {...register("loansum", {
                                required: {value: true, message: "Loansum required"},
                                min: {value: 0, message: "Min - 0"},
                                max: {value: 10000000, message: "Max - 10 000 000"},
                            })}/>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Controller
                            name={"purpose"}
                            control={control}
                            rules={
                                {required: {value: true, message: "Purpose required"},}
                            }
                            render={({field}) => (
                                <FormControl fullWidth error={!!errors.purpose}>
                                    <InputLabel>Purpose</InputLabel>
                                    <Select value={field.value}
                                            label={"Purpose"}
                                            onChange={field.onChange}>
                                        <MenuItem value={"ConsumerLoan"}
                                                  key={"ConsumerLoan"}>{"Consumer Loan"}</MenuItem>
                                        <MenuItem value={"Property"} key={"Property"}>{"Property"}</MenuItem>
                                        <MenuItem value={"Reloaning"} key={"Reloaning"}>{"Reloaning"}</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.purpose?.message}</FormHelperText>
                                </FormControl>
                            )}/>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkedOtherLoans}
                                    onChange={handleOtherLoansChange}
                                    inputProps={{"aria-label": "controlled"}}
                                />
                            }
                            label="Other loans"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Controller
                            name={"deposit"}
                            control={control}
                            rules={
                                {required: {value: true, message: "Deposit required"},}
                            }
                            render={({field}) => (
                                <FormControl fullWidth error={!!errors.deposit}>
                                    <InputLabel>Deposit</InputLabel>
                                    <Select value={field.value}
                                            label={"Deposit"}
                                            onChange={field.onChange}>
                                        <MenuItem value={"None"} key={"None"}>{"None"}</MenuItem>
                                        <MenuItem value={"Property"} key={"Property"}>{"Property"}</MenuItem>
                                        <MenuItem value={"NewCar"} key={"NewCar"}>{"New Car age < 3"}</MenuItem>
                                        <MenuItem value={"OldCar"} key={"OldCar"}>{"Old Car age >=3"}</MenuItem>
                                        <MenuItem value={"Guarantee"} key={"Guarantee"}>{"Guarantee"}</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.deposit?.message}</FormHelperText>
                                </FormControl>
                            )}/>
                    </Grid>
                        
                </Grid>

                <div style={{marginBottom: "20px"}}>
                    <Button variant="contained" type={"submit"}>Calculate</Button>
                    <span style={{marginLeft: "20px"}}>{responseString}</span>
                </div>
            </form>
        </div>
    )
}