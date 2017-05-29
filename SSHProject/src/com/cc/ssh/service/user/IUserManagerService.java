package com.cc.ssh.service.user;

import com.cc.ssh.forms.UserForm;

public interface IUserManagerService {  
	  
    public void regUser(UserForm userForm);  
    
    public void checkUser(String userName,String password);  
  
} 
