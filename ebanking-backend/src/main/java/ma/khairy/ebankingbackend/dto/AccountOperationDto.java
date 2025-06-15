package ma.khairy.ebankingbackend.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.khairy.ebankingbackend.entities.BankAccount;
import ma.khairy.ebankingbackend.enums.OperationType;

import java.util.Date;

@Data
public class AccountOperationDto {
    private Long id;
    private Date operationDate;
    private double amount;
    private OperationType type;
}
