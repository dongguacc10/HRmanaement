import { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置 NProgress
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.1,
  speed: 200,
  trickleSpeed: 100 
});

export function PageLoading() {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return null;
}