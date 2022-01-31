import React,{useState,useEffect} from 'react'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import './AdminUserCard.css'
import {ip} from '../../constants'

const AdminUserCard = ({values}) => {
    // const images = require.context('./public', true);
    // let image = images(`./${values.filename}`);
    const [image,setimage] = useState()
    return (
        <div>
            <section class="section  gray-bg" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                           <div class="about-list">
                                {/* <div class="col-md-6"> */}
                                    {/* <div class="media">
                                        <label>Grade</label>
                                        <p>{values.grade}</p>
                                    </div>
                                    <div class="media">
                                        <label>Age</label>
                                        <p>{values.age}</p>
                                    </div> */}
                                    <div class="media">
                                        <label>E-mail</label>
                                        <p>{values.email}</p>
                                    </div>
                                    <div class="media">
                                        <label>Phone</label>
                                        <p>{values.phonenumber}</p>
                                    </div>
                                   
                                    <div class="media">
                                        <label>Address</label>
                                        <p>{values.address}</p>
                                    </div>
                                    <div class="media">
                                        <label>Residence</label>
                                        <p>{values.region}</p>
                                    </div>
                                {/* </div> */}
                                {/* <div class="col-md-6"> */}
                                    
                                    <div class="media">
                                        <label>City</label>
                                        <p>{values.city}</p>
                                    </div>
                                    <div class="media">
                                        <label>pincode</label>
                                        <p>{values.pincode}</p>
                                    </div>
                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                    <div class="col-lg-6">
                       {values.filename &&  <div class="about-avatar">
                        <SimpleReactLightbox>
      <SRLWrapper>
                        <a href={`${ip.host}/images/${values.filename}`}>
                        <img src={`${ip.host}/images/${values.filename}`} title="" alt="" />
                         </a>
                         {/* <a
                           href={image}
                           download
                          >
                            <i className="fa fa-download" />
                          </a> */}
                                </SRLWrapper>
    </SimpleReactLightbox>
                         </div>}
                    </div>
                </div>
                <div class="counter">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" >{values.studentage}</h6>
                                <p class="m-0px font-w-600">Age</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2">{values.grade}</h6>
                                <p class="m-0px font-w-600">Grade</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" >{values.mark1 !== null ? values.mark1 : '0'}</h6>
                                <p class="m-0px font-w-600">Mark-1</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" >{values.mark2 !== null ? values.mark2 : '0'}</h6>
                                <p class="m-0px font-w-600">Mark-2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default AdminUserCard
