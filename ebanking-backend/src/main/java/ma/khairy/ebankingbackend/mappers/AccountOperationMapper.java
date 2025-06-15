package ma.khairy.ebankingbackend.mappers;

import ma.khairy.ebankingbackend.dto.AccountOperationDto;
import ma.khairy.ebankingbackend.entities.AccountOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class AccountOperationMapper {

    public AccountOperationDto fromAccountOperation(AccountOperation accountOperation) {
        AccountOperationDto dto = new AccountOperationDto();
        BeanUtils.copyProperties(accountOperation, dto);
        return dto;
    }
}
