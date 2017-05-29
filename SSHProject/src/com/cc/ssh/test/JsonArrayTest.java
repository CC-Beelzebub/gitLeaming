package com.cc.ssh.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import net.sf.json.JSONArray;

public class JsonArrayTest {
	@Test
	public void jsonArray(){
		
		List<String> list=new ArrayList<String>();
		list.add("aa");
		list.add("bb");
		list.add("cc");
		
		JSONArray jsonArray=JSONArray.fromObject(list);
		System.out.println(jsonArray.toString());
	}
}
