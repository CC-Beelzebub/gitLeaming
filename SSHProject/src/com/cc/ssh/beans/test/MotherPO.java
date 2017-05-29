package com.cc.ssh.beans.test;

import java.util.Set;

public class MotherPO {

	private int id;
	private String name;
	private Set<ChildPO> myChilds;
	
	
	public MotherPO() {
		super();
	}


	public MotherPO(int id, String name, Set<ChildPO> myChilds) {
		super();
		this.id = id;
		this.name = name;
		this.myChilds = myChilds;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public Set<ChildPO> getMyChilds() {
		return myChilds;
	}


	public void setMyChilds(Set<ChildPO> myChilds) {
		this.myChilds = myChilds;
	}
	
	
	
}
