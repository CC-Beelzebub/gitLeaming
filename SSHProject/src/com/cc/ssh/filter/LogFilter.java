package com.cc.ssh.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class LogFilter implements Filter{

	private FilterConfig filterConfig;
	
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		this.filterConfig=null;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
         //-----对用户请求预处理
		//获取ServletContext对象，用于记录日志
		ServletContext context=this.filterConfig.getServletContext();
		long before=System.currentTimeMillis();
		System.out.println("开始过滤...");
		HttpServletRequest hrequest=(HttpServletRequest) request;
		System.out.println("用户地址:"+hrequest.getServletPath());
		chain.doFilter(request, response);
		long after=System.currentTimeMillis();
	     System.out.println("过滤结束");
	     System.out.println("请求被定为到:"+hrequest.getRequestURI()+"所花费的时间:"+(after-before));
		
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		this.filterConfig=filterConfig;
	}

}
