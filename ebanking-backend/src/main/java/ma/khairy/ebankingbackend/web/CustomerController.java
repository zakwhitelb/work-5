package ma.khairy.ebankingbackend.web;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.khairy.ebankingbackend.dto.CustomerDto;
import ma.khairy.ebankingbackend.services.IBankAccountService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class CustomerController {

    private IBankAccountService bankAccountService;


    @GetMapping("/customers")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public List<CustomerDto> customers() {
        return bankAccountService.listCustomers();
    }

    @GetMapping("/customers/search")
        @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public List<CustomerDto> customers(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return bankAccountService.searchCustomers(keyword);
    }

    @GetMapping("/customers/{id}")
        @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public CustomerDto getCustomer(@PathVariable Long id) {
        return bankAccountService.getCustomer(id);
    }

    @PostMapping("/customers")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public CustomerDto saveCustomer(@RequestBody CustomerDto customerDto) {
        return bankAccountService.saveCustomer(customerDto);
    }

    @PutMapping("/customers/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public CustomerDto updateCustomer(@PathVariable Long id, @RequestBody CustomerDto customerDto) {
        customerDto.setId(id);
        return bankAccountService.updateCustomer(customerDto);
    }

    @DeleteMapping("/customers/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public void deleteCustomer(@PathVariable Long id) {
        bankAccountService.deleteCustomer(id);
    }
}
