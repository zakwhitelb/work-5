package ma.khairy.ebankingbackend.dto;

import lombok.Data;
import ma.khairy.ebankingbackend.enums.AccountStatus;

import java.util.Date;

@Data
public class SavingBankAccountDto extends BankAccountDto{
    private String id;
    private double balance;
    private Date createdAt;
    private AccountStatus status;
    private CustomerDto customerDto;
    private double interestRate;
}
