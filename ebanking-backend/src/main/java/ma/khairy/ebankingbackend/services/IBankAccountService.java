package ma.khairy.ebankingbackend.services;

import ma.khairy.ebankingbackend.dto.*;
import ma.khairy.ebankingbackend.entities.BankAccount;
import ma.khairy.ebankingbackend.entities.CurrentAccount;
import ma.khairy.ebankingbackend.entities.Customer;
import ma.khairy.ebankingbackend.entities.SavingAccount;

import java.util.List;

public interface IBankAccountService {
    CustomerDto saveCustomer(CustomerDto customerDto);
    CurrentBankAccountDto saveCurrentBankAccount(double initialBalance, double overDraft, Long customerId);
    SavingBankAccountDto saveSavingBankAccount(double initialBalance, double interestRate, Long customerId);
    List<CustomerDto> listCustomers();
    BankAccountDto getBankAccount(String accountId);
    void debit(String accountId, double amount, String description);
    void credit(String accountId, double amount, String description);
    void transfer(String accountIdSource, String accountIdDestination, double amount);
    List<BankAccountDto> bankAccountList();
    CustomerDto getCustomer(Long id);
    CustomerDto updateCustomer(CustomerDto customerDto);
    void deleteCustomer(Long id);
    List<AccountOperationDto> accountHistory(String accountId);
    AccountHistoryDto getAccountHistory(String accountId, int page, int size);
    List<CustomerDto> searchCustomers(String keyword);
}
