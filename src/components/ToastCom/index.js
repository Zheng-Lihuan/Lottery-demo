import toastcom from './toast'
import vue from 'vue'

const ToastCon=vue.extend(toastcom)

function  showtoast(msg,duration=3000){
  const ins=new ToastCon({
    el:document.createElement('div'),
    data(){
      return {
        msg,
        duration,
        visible:true,
        showContent:true
      }
    }
  })

  document.body.appendChild(ins.$el)
  setTimeout(() => {
    ins.visible=false;
  }, duration);

  setTimeout(() => {
    ins.showContent=false;
  }, duration-250);

  setTimeout(() => {
    ins.visible=false;
  }, duration);
}


function registryToast(){
  vue.prototype.$toast=showtoast;
}

export default registryToast