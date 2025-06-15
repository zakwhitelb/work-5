package ma.khairy.ebankingbackend.security;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class SecurityController {

    private AuthenticationManager authenticationManager;
    private JwtEncoder jwtEncoder;

    @GetMapping("/profile")
    public Authentication getProfile(Authentication authentication) {
        return authentication;
    }

    @PostMapping("/login")
    public Map<String, String> login(String username, String password) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        Instant now = Instant.now();
        String scope = authenticate.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .subject(username)
                .issuedAt(now)
                .expiresAt(now.plus(10, ChronoUnit.MINUTES)) // 1 hour expiration
                .claim("scope", scope)
                .build();

        JwtEncoderParameters jwtEncoderParameters
                = JwtEncoderParameters.from(
                        JwsHeader.with(MacAlgorithm.HS512).build()
                ,claimsSet);
        String jwt = jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
        return Map.of("access-token", jwt);
    }
}
