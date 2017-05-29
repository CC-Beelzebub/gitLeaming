package com.cc.ssh.dao.user.impl;


import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.junit.Test;
import org.springframework.beans.BeanUtils;

import com.cc.ssh.beans.user.User;
import com.cc.ssh.dao.base.impl.BaseDao;
import com.cc.ssh.dao.user.IUserManagerDao;
import com.cc.ssh.forms.UserForm;

public class UserManagerDaoImpl extends BaseDao implements IUserManagerDao{

    
	@Override
	public void regUser(UserForm userForm) {
		 User user = new User();  
	     BeanUtils.copyProperties(userForm, user);  
	    
         try {
        	 System.out.println("========注册开始===========");
        	 
        	 Session session=this.getSession();
        	 Transaction ts = session.beginTransaction(); 

        		 session.save(user);
        	
        	
        	
        	 ts.commit();
        	 
			System.out.println("========注册结束===========");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	
	public int findAllUser() {
		StringBuffer hql=new StringBuffer();
		hql.append(" from User");
		Session session=super.getSession();
		Query query=session.createQuery(hql.toString());
		int size=query.list().size();
		return size;
	}
	@Test
	public void findAllUser2() {
		StringBuffer hql=new StringBuffer();
		hql.append(" from User");
		Session session=super.getSession();
		Query query=session.createQuery(hql.toString());
		int size=query.list().size();
		System.out.println(size);
	}


	@Override
	public void checkUser(String userName, String password) {
	/*	StringBuffer hql=new StringBuffer();
		hql.append(" from User");
		Session session=super.getSession();
		Query query=session.createQuery(hql.toString());
		int size=query.list().size();
		System.out.println(size);*/
		
		User user = new User();  
	    user.setGender(1);
	    user.setUsername("ppppppppp");
	    
        try {
       	  System.out.println("========注册开始===========");
       	 
       	  Session session=this.getSession();
       	 Transaction ts = session.beginTransaction(); 

       	 session.save(user);
       	
       	
       	 ts.commit();
       	 
			System.out.println("========注册结束===========");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
