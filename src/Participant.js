import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/style/AjouterParticipant.css'

const AjouterParticipant = () => {
     // eslint-disable-next-line
     const [participantData, setParticipantData] = useState({
          nom: '',
          prenom: '',
          num_tel: '',
          mail: ''
     });
      // eslint-disable-next-line
     const [apiResponse, setApiResponse] = useState(null);
      // eslint-disable-next-line
     const [isError, setIsError] = useState(false);
     const [isSuccess, setIsSuccess] = useState(false);
     const [error, setError] = useState(null);
     const [message, setMessage] = useState(null);
     //eslint-disable-next-line
     const handleInputChange = (e) => {
          const { name, value } = e.target;
          const list = {...participantData}
          list[name] = value
          setParticipantData(list);
     };

     const handleInputNameChange = (e) => {
          const { name, value } = e.target;
          const list = {...participantData}
          list[name] = value?.toUpperCase()
          setParticipantData(list);
     };

     useEffect(() => {
          if (apiResponse) {
               // La réponse de l'API est disponible, vous pouvez effectuer des actions en conséquence ici.
               console.log('Réponse de l\'API :', apiResponse);
          }
          if (error) {
               setError("Erreur lors de l'ajout du participant")
          }
     }, [apiResponse, error])

     const onSubmit = (e) => {
          e.preventDefault();

          console.log('Données du participant à envoyer :', participantData);

          axios
          .post('http://localhost:4000/participants/', participantData, {headers:{ 'Content-Type': 'application/json'}})
          .then((response) => {
               setIsError(false)
               setIsSuccess(true)
               setMessage("Participant enregistré(e) avec succès !")
               setError("")
               console.log('Réponse de l\'API :', response.data);
               setParticipantData({
                    nom:"",
                    prenom: '',
                    mail: "",
                    num_tel: ""
               })
               // ...
          })
          .catch((err) => {
               setIsError(true)
               setIsSuccess(false)
               setError("Erreur lors de l'ajout du participant")
               setMessage("")
               console.error('Erreur lors de l\'ajout du participant :', err);
               // ...
          });
     };

     return (
          <div className="container">
               <div className="card">
                    <div className="card-title">
                         <h1>Veuillez ajouter un participant</h1>
                    </div>
               </div>
               <div className="divbtn">
                    <Link to="/" className="btn btn-danger">Retour à la Liste des participants</Link>
               </div>
               <div className='wrapper d-flex align-items-center justify-content-center w-100'>
                    <div className='login'>
                         {isError && <div className="alert alert-danger">{error}</div>}
                         {isSuccess && <div className="alert alert-success">{message}</div>}
                         <div className='needs-validation'>
                              <div className="row">
                                   <div className='form-group mb-2 col'>
                                        <label htmlFor='nom' className='form-label'>Nom du participant</label>
                                        <input type="text" className='form-control' name="nom" value={participantData.nom} onChange={handleInputNameChange} required />
                                        <div className="invalid-feedback">
                                             Entrer le nom du participant svp
                                        </div>
                                   </div>
                                   <div className='form-group mb-2 col'>
                                        <label htmlFor='prenom' className='form-label'>Prénom du participant</label>
                                        <input type="text" className='form-control' name="prenom" value={participantData.prenom} onChange={handleInputNameChange} required />
                                        <div className="invalid-feedback">
                                             Entrer le prénom du participant svp
                                        </div>
                                   </div>
                              </div>
                              
                              <div className='form-group mb-2'>
                                   <label htmlFor='telephone' className='form-label'>Numéro de téléphone</label>
                                   <input type="tel" className='form-control' name="num_tel" value={participantData.num_tel} onChange={handleInputChange} />
                                   <div className="invalid-feedback">
                                        Entrer le numéro de téléphone svp
                              </div>
                              <div className='form-group mb-2'>
                                   <label htmlFor='email' className='form-label'>Email</label>
                                   <input type="email" className='form-control' name="mail" value={participantData.mail} onChange={handleInputChange} />
                                   <div className="invalid-feedback">
                                        Entrer l'adresse email svp
                                   </div>
                              </div>
                              <button className="btn btn-success" type="submit" onClick={(e) => onSubmit(e)}>Enregistrer</button>
                              </div>
                         </div>
                    </div>
               </div>          
          </div>
     );
}

export default AjouterParticipant;
