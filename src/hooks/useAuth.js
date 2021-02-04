import React from 'react'
import API from '../api'
import useModal from './useModal'

export default function useAuth(initState) {
  const [token, _] = React.useState(initState.token)
  const [admins, setAdmins] = React.useState([])
  const [userInfo, setUserInfo] = React.useState({
    id: null,
    name: '',
    phone: ''
  })
  const modal = useModal()

  const login = async (id, password) => {
    modal.handleOpen("학생 정보 확인중입니다.");
    const response = await API.login(id, password)

    if (response.code === 200) {
      localStorage.setItem("auth_token", response.data.token)
      window.location.href = "/";
    } else {
      alert(response.msg)
      modal.handleClose()
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
  }

  const setUserAuth = async () => {
    modal.handleOpen("학생 정보 확인중입니다.");
    const response = await API.auth();

    if (response.code === 200) {
      localStorage.setItem("auth_token", response.data.refreshToken);
      setUserInfo(response.data.userInfo ? {
        ...response.data.userInfo,
        isAdmin: response.data.isAdmin,
        id: response.data.userId
      } : {
        id: response.data.userId,
        isAdmin: response.data.isAdmin,
        name: '',
        phone: ''
      })

      modal.handleClose();
      return response.data;
    } else {
      modal.handleClose();
    }
  }

  const getAdmins = async () => {
    modal.handleOpen("");
    const response = await API.getAdmins();
    setAdmins(response.data.admins)
    modal.handleClose()
    return response;
  }

  const createAdmin = async (userId) => {
    modal.handleOpen("");
    const response = await API.createAdmin({
      userId
    })
    if (response.code === 200) {
      await getAdmins();
    }
    modal.handleClose()
    return response;
  }

  const deleteAdmin = async (userId) => {
    modal.handleOpen("");
    const response = await API.deleteAdmin(userId)
    if (response.code === 200) {
      await getAdmins();
    }
    modal.handleClose()
    return response;
  }

  return {
    token,
    userInfo,
    modal,
    admins,

    login,
    logout,
    getAdmins,
    createAdmin,
    deleteAdmin,
    setUserAuth
  }
}