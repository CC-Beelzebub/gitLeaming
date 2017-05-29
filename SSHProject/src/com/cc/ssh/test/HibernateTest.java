package com.cc.ssh.test;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.cc.ssh.beans.test.ChildPO;
import com.cc.ssh.beans.test.MotherPO;
import com.cc.ssh.beans.user.User;

public class HibernateTest{
	private SessionFactory sessionFactory;
	private Session session;
	private Transaction transaction;
	
	@Before
	public void init(){
		System.out.println("=========初始化========");
		Configuration configuration=new Configuration().configure();
		ServiceRegistry serviceRegistry=new ServiceRegistryBuilder().applySettings(configuration.getProperties()).buildServiceRegistry();
		sessionFactory=configuration.buildSessionFactory(serviceRegistry);
		session=sessionFactory.openSession();
		transaction=session.beginTransaction();
//	    session=this.getSession();
//		transaction=session.beginTransaction();
	}
	@After
	public void destroy(){
		transaction.commit();
		System.out.println("=========销毁========");
		session.close();
		//sessionFactory.close();
	}
	/**
	 * 测试映射文件主键在表中存在相同的时候的情况
	 */
	@Test
	public void testSameId(){
		StringBuffer hql=new StringBuffer();
		hql.append(" from User");
		Query query=this.session.createQuery(hql.toString());
		List<User> list= query.list();
		System.out.println(list);
	}
	/**
	 * update：
	 * 1、若更新一个持久化对象，不需要显示调用update方法
	 * ，因为Transaction的commit()方法时，会先执行session的flush方法
	 * 2、更新一个游离对象，需要显示的调用session的update方法，可以把一个游离对象
	 * 变为持久化对象
	 * 
	 * 需要注意的是：
	 * 1、无论要更新的游离对象和数据表的记录是否一致，都会发送update语句。
	 * 如何能让update方法不在盲目的发出update语句呢？在.hbm.xml文件的class节点设置
	 * select-before-update=true（默认为false），通常不需要设置该属性。
	 * 
	 * 2、若数据表中没有对应的记录，但还是调用乐update方法，会抛出异常
	 * 
	 * 3、当update()方法关联一个游离对象时；
	 * 如果在Session的缓存中已经存在相同的OID的持久化对象，会输出异常，因为在Session缓存中不能有两个OID相同的对象。
	 * 
	 */
	@Test
	public void testUpdate(){
		User user=(User) session.get(User.class, 9);
		transaction.commit();
        session.close();
        
        session=sessionFactory.openSession();
        transaction=session.beginTransaction();
        
        User user2=(User) session.get(User.class, 9);
        
        session.update(user);//此时会发生异常，将游离对象user纳入新的session中更新，但是在同session中已经存在相同oid的对象乐
        
       // System.out.println(user.getClass());
	}
	/**
	 * get VS load
	 * 
	 * 1、執行get方法：囘立即加載對象
	 *   執行load方法，若不適用該對象，則不會立即執行查詢操作，而返回一個代理對象
	 *   
	 *   get是立即檢索，load是延遲檢索。
	 * 
	 * 2、load方法可能會抛出LazyInitializationException異常：在需要初始化代理對象
	 * 之前已經關閉樂Session
	 * 
	 * 3、若數據表中沒有對應的記錄，Session也沒有被關閉
	 * get 返回null
	 * load 若不使用該對象的任何屬性，沒問題；若需要初始化了，抛異常
	 */
	@Test
	public void testLoad(){
		User user=(User) session.load(User.class, 1);
//		user.getPassword();
//		System.out.println(user);
		session.close();
		System.out.println(user);//LazyInitializationException
	}
	@Test
	public void testGet(){
		User user=(User) session.get(User.class, 1);
		System.out.println(user);
	}
	/**
	 * 和sava()的區別
	 * 在調用persist方法之前，若對象已經有id樂，則不會執行insert
	 */
	@Test
	public void testPersist(){
		User user=new User();
		user.setUsername("dd");
		user.setPassword("123");
		//user.setUserId(777);會抛異常
		session.persist(user);
	}
	/**
	 * 1、save()方法
	 * 1)、使一個臨時對象變爲持久化對象
	 * 2)、為對象分配ID
	 * 3)、在flush緩存時會發榮一條inset語句
	 * 4)在sava方法之前設置id是無效的
	 */
	@Test
	public void testSave(){
		User user=new User();
		user.setUsername("cc");
		user.setPassword("123");
		user.setUserId(9999);//此時設置id無效
		session.save(user);
		//user.setUserId(9999);//sava()后設置id會抛出異常
		System.out.println(user);
	}
	@Test
	public void testClear(){
		User user1=(User) session.get(User.class, 8);
		session.clear();//清理緩存后要發兩條sql。前提是獲取的數據要在數據庫中存在才能緩存到session中
		User user2=(User) session.get(User.class, 8);
	}
	@Test
	public void testSessioFlush(){
		//User user=(User) session.get(User.class, "40288d8158b547f40158b56c68090007");
		try{
	User user=new User("cj123456","123456",3);
		for(int i=0;i<7;i++){
			//User user=new User("cj123456","123456",3);
			session.save(user);
			if(i%2==0){
				session.flush();
				session.clear();
			}
		}
		}catch(Exception e){
			e.printStackTrace();
		}
		//大批量的数据添加
       /*try{
		for (int i=0; i<100; i++) {

		User user = new User();
		user.setUsername("张三" + i);
		user.setPassword("123"+i);
		session.save(user);
		//每20条更新一次
		if (i % 20 == 0) {
		session.flush();
		//清除缓存的内容
		session.clear();
		}
		}
       }catch(Exception e){
    	   e.printStackTrace();
       }*/
	}
	@Test
    public void testSessioCache(){
		System.out.println("=========主程序========");
		try{
		//把id为xx的获取出来
		User users=(User) session.get(User.class, "40288d8158b547f40158b56c68090007");
		System.out.println(users);
		User users2=(User) session.get(User.class, "40288d8158b547f40158b56c68090007");
		System.out.println(users2);
		}catch(Exception e){
			e.printStackTrace();
		}
		
    }
	
	@Test
	public void testOneTomany(){
		ChildPO child1=new ChildPO();
		ChildPO child2=new ChildPO();
		child1.setId(3);
		child1.setName("aa");
	
		child2.setId(3);
		child2.setName("aa");
		
		MotherPO mother=new MotherPO();
		mother.setId(7);
		mother.setName("日和");
		//mother.setMyChilds(child1);
		session.save(child1);
		session.save(child1);
		session.save(mother);
		
		System.out.println("================================");
	}
}
