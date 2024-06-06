import { UniqueConstraintError, where } from "sequelize";

export const QueryHelper = function (query, filter, search, searchColumn, order, paggination, groupBy){
    let queryString = "";
    if(query != ""){
        queryString += query;
    }
    if(filter != ""){
        queryString += filter;
    }
    if(search != "" && search != undefined){
        let querySearch = ` and concat(${searchColumn}) like '%${search}%' `;
        queryString += querySearch;
    }
    if(order != ""){
        queryString += ` ORDER BY ${order} `;
    }
    if(groupBy != ""){
        queryString += groupBy;
    }
    if(paggination != ""){
        queryString += paggination;
    }

    return queryString;
}

export const PaginationHelper = function(page, size){
    let paggination = "";

    console.log('page', page ,size)
    if(page != undefined && size != undefined){
        if(parseInt(page) > 0){ 
            let skip = (page - 1) * size;
            paggination = `OFFSET ${skip} ROWS FETCH NEXT ${size} ROWS ONLY`;
        }
    }
    return paggination;
}