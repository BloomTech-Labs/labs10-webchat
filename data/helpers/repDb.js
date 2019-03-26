const db = require('../db.js');
 
module.exports = {
  get,
  getById,
  getByEmail,
  getByCompanyId,	
  getDetails,
  insert,
  updateByUid,	
  update,
  updaterepinfo,
  remove,
  getByUid,
};

function get(){
        return db('representatives');
}

function getById(id){
const query = db('representatives').where('id', id);

    return query.then(representatives => {
            return representatives[0];
    });
}

function getByUid(uid){
        const query = db('representatives').where('uid', uid);
        
            return query.then(representatives => {
                return representatives[0];
            });
}

function getByEmail(email) {
const query = db('representatives').where('email', email);

    return query.then(representatives => {
            return representatives[0];
    });
}


function getByCompanyId(company_id, uid){
const query = db('representatives').where('company_id', company_id).whereNot('uid', uid);

	return query.then(representatives =>{
		return representatives;
	});

}


function getDetails(uid){

const query = db
        .select([
                "representatives.name as name",
                "representatives.motto",
		"representatives.uid",
		"representatives.email",
		"representatives.phone_number",
                "representatives.company_id",
                "representatives.image_id",
                "companies.name as company_name", 
                "images.url"
        ])
        .from('representatives')
        .innerJoin('companies', 'representatives.company_id', 'companies.id')
        .innerJoin('images', 'representatives.image_id','images.id')
        .where('representatives.uid', uid);

	return query.then(details =>{
	        return details[0];
	});
}


function insert(user) {
  return db('representatives')
    .insert(user).returning('id').then(ids => ids[0]);
}

function updaterepinfo(uid, user) {
        return db('representatives')
                .where('uid', uid)
                .update(user);
}


function updateByUid(uid, user){
        return db('representatives')
               .where({uid: uid})
               .update(user);
}


function update(id, user){
        return db('representatives')
               .where({id: Number(id)})
               .update(user);
}

function remove(id){
        return db('representatives')
               .where({id: Number(id)})
               .del();
}
