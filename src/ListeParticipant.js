import { Link} from "react-router-dom";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/style/ListeParticipant.css'
import axios from "axios";
import {useState, useEffect} from 'react';

const ListeParticipant = () => {
    const [participant, setPartcipant] = useState([]);

    // ajouter un produit
     useEffect(() =>{
        axios.get('http://raissadiabate-simplon-project.web.app/participant')
        .then((response)=>  {
          setPartcipant(response.data);
          // console.log(participant);
        })
        .catch((e)=> {
          console.log(e);
     })

    }, []);
    return (
          <div className="container">
               <div className="card">
                    <div className="card-title">
                         <h1>Liste des Participants</h1>
                    </div>
               </div>
               <div className="card-body">
                    <div className="divbtn">
                      <Link to="/teste_ligne/participant" className="btn btn-success">+ Ajouter</Link>
                    </div>          
                    <table className="table table-bordered">
                         <thead className="bg-dark text-white">
                              <tr>
                                   <td>Nom</td>
                                   <td>Prénom</td>
                                   <td>Numéro de téléphone</td>
                                   <td>Adresse mail</td>
                              </tr>
                         </thead>
                         <tbody>
                              {participant &&
                                participant.map((item, cle) => (
                                   <tr key={cle}>
                                        <td>{!!item?.nom ? item?.nom : "Non enregistré"}</td>
                                        <td>{!!item?.prenom ? item?.prenom : "Non enregistré"}</td>
                                        <td>{!!item?.num_tel ? item?.num_tel : "Non enregistré"}</td>
                                        <td>{!!item?.mail ? item?.mail : "Non enregistré"}</td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>              
               </div>
          </div>
     );
}

export default ListeParticipant;