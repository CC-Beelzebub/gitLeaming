package com.cc.ssh.service.user.impl;

import com.cc.ssh.dao.user.IUserManagerDao;
import com.cc.ssh.forms.UserForm;
import com.cc.ssh.service.user.IUserManagerService;

public class UserManagerServiceImpl implements IUserManagerService {

	private IUserManagerDao userManagerDao;
	
	
	public IUserManagerDao getUserManagerDao() {
		return userManagerDao;
	}


	public void setUserManagerDao(IUserManagerDao userManagerDao) {
		this.userManagerDao = userManagerDao;
	}


	@Override
	public void regUser(UserForm userForm) {
		userManagerDao.regUser(userForm);
	}


	@Override
	public void checkUser(String userName,String password) {
		userManagerDao.checkUser(userName, password);
	}  
	  
   /* private IBaseDao dao;  
  
    public void setDao(IBaseDao dao) {  
        this.dao = dao;  
    }  
  
    @Override  
    public void regUser(UserForm userForm) throws HibernateException {  
        User user = new User();  
        BeanUtils.copyProperties(userForm, user);  
        dao.saveObject(user);  
    }  
  */
}  