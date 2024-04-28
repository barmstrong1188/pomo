package com.pomodoro.pomo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

    // Redirect to login page
    @GetMapping("/login")
    public String login() {
        return "login"; // Assuming you have a login.html in your static or templates directory
    }

    // After login, redirect to the home page (index.html)
    // @GetMapping("/")
    // public ModelAndView home(@AuthenticationPrincipal OAuth2User principal) {
    //     ModelAndView mav = new ModelAndView("index"); // Redirect to 'index.html' after login
    //     if (principal != null) {
    //         mav.addObject("name", principal.getAttribute("name"));
    //     } else {
    //         // Redirect to login page if the user is not authenticated
    //         mav.setViewName("redirect:/login");
    //     }
    //     return mav;
    // }
    @GetMapping("/")
    public String home(@AuthenticationPrincipal OAuth2User principal) {
        if (principal != null) {
            return "redirect:/index.html"; // Directly redirect to static HTML
        } else {
            return "redirect:/login.html";
        }
    }
    
    // Logout and redirect to login page
    @RequestMapping("/logout")
    public String logout() {
        return "redirect:/login.html"; // Customize the logout functionality as needed
    }
}
