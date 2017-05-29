package com.cc.ssh.dao.base;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public interface IBaseDao {  

	public SessionFactory getSessionFactory();
	
	public Session getSession();
	
	public Session getNewSession();
	
	public void add(Object entity) throws Exception;
	
	public void addOrUpdate(Object entity) throws Exception;

	public void addOrUpdateAll(Collection<?> entities) throws Exception;

	public void delete(Object entity) throws Exception;

	public void delete(Class<?> entityClass, Serializable id);


	
    public void saveObject(Object obj) throws HibernateException;  
  
} 
