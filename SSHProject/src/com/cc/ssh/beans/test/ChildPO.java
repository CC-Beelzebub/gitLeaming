package com.cc.ssh.beans.test;

public class ChildPO {

	private int id;
	private String name;
	private MotherPO myMum;
	
	
	public ChildPO() {
		super();
	}
	
	
	public ChildPO(int id, String name, MotherPO myMum) {
		super();
		this.id = id;
		this.name = name;
		this.myMum = myMum;
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
	public MotherPO getmyMum() {
		return myMum;
	}
	public void setmyMum(MotherPO myMum) {
		this.myMum = myMum;
	}
	
	
}
