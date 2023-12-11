src/main/resources/application-oauth.yml 파일을 만들고

```
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: 337209880852-b8nepvrttb5kja4jjb25tk84kjh98sjb.apps.googleusercontent.com
            client-secret: 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
            scope: profile, email

          naver:
            client-id: Rzk7yaR0zInDbBLhEc59
            client-secret: VgA3VN5P31
            redirect-uri: http://localhost:8111/login/oauth2/code/naver
            authorization-grant-type: authorization_code
            scope: name, email, profile_image
            client-name: Naver

          kakao:
            client-id: 161757e6d5a06f1e7e17f2ca8adc7408
            client-secret: pGDJWTAOdfL8gapsUWfBbrtuWtObH4QK
            redirect-uri: http://localhost:8111/login/oauth2/code/kakao
            client-authentication-method: POST
            authorization-grant-type: authorization_code
            scope: profile_nickname, profile_image
            client-name: Kakao

        provider:
          naver:
            authorization_uri: https://nid.naver.com/oauth2.0/authorize
            token_uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user_name_attribute: response

          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id
```

이 코드를 추가해주세요.

그리고 여기 있는 파일은 절대 유출 시키지 말아주세요
