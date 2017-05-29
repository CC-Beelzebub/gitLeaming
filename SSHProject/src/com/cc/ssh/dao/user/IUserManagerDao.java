package com.cc.ssh.dao.user;

import com.cc.ssh.forms.UserForm;

public interface IUserManagerDao {
	public void regUser(UserForm userForm); 
	
	public int findAllUser();
	
	public void checkUser(String userName,String password);
}
