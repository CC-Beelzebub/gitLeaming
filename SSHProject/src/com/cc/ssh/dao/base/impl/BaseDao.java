package com.cc.ssh.dao.base.impl;

import java.io.Serializable;
import java.util.Collection;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.cc.ssh.dao.base.IBaseDao;

public class BaseDao implements IBaseDao {

	public SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	/**
	 * 获取当前session
	 * @return
	 */
	public Session getSession(){
		return sessionFactory.getCurrentSession();//需要开启事务
	}
	
	public Session getNewSession(){
		return sessionFactory.openSession();//需要开启事务
	}
	
	public void add(Object entity) throws Exception {
		getSession().save(entity);
	}
	
	public void addOrUpdate(Object entity) throws Exception {
		getSession().saveOrUpdate(entity);
	}

	public void addOrUpdateAll(Collection<?> entities)
			throws Exception {
		for (Object object : entities) {
			addOrUpdate(object);
		}
	}
	
	public void delete(Object entity) throws Exception {
		getSession().delete(entity);
		
	}
	
	public void delete(Class<?> entityClass, Serializable id){
		Object entity = getSession().get(entityClass, id);
		if (entity != null) {
			getSession().delete(entity);
		}
	}
	
	@Override
	public void saveObject(Object obj) throws HibernateException {

	}

}
