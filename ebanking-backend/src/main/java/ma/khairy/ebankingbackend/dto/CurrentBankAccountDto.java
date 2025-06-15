package ma.khairy.ebankingbackend.dto;

import lombok.Data;
import ma.khairy.ebankingbackend.enums.AccountStatus;

import java.util.Date;

@Data
public class CurrentBankAccountDto extends BankAccountDto {
    private String id;
    private double balance;
    private Date createdAt;
    private AccountStatus status;
    private CustomerDto customerDto;
    private double overdraft;
}
