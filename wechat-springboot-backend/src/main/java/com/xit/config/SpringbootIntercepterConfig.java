package com.xit.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.xit.controller.LoginInterceptor;

//@Configuration
public class SpringbootIntercepterConfig extends WebMvcConfigurerAdapter {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns("/abc/**")
                .excludePathPatterns("/api/login/**","/api/**", "/api/sockettest/**","/swagger-resources/**", "/shortMessage/**", "/user/makesure/**","/user/has/**","/attachment/**");
        super.addInterceptors(registry);
    }
}