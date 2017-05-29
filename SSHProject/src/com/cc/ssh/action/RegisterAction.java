package com.cc.ssh.action;

import com.cc.ssh.forms.UserForm;
import com.cc.ssh.service.user.IUserManagerService;
import com.opensymphony.xwork2.ActionSupport;

public class RegisterAction extends ActionSupport {  
	  
    private static final long serialVersionUID = 1L;  
  
    private UserForm user;  
  
    private IUserManagerService userManager;  
  
    public UserForm getUser() {  
        return user;  
    }  
  
    public void setUser(UserForm user) {  
        this.user = user;  
    }  
  
    public void setUserManager(IUserManagerService userManager) {  
        this.userManager = userManager;  
    }  
  
    public String execute() {  
        try {  
            userManager.regUser(user);  
            System.out.println(user);
//          System.out.println(user);
            return SUCCESS;  
  
        } catch (Exception e) {  
            e.printStackTrace();  
            return ERROR;  
        }  
    }  
 
}  