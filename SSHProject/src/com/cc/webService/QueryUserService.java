package com.cc.webService;

import javax.jws.WebParam;
import javax.jws.WebService;

@WebService
public interface QueryUserService {
	public String getUserInfo(@WebParam(name = "param") String param) throws Exception;
}
