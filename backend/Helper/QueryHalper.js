import { where } from "sequelize";

export const QueryString = function (query, filter, order, paggination, groupBy){
    let queryString = "";
    if(query != ""){
        console.log('query :  ',query);
        queryString += query;
    }
    if(filter != ""){
        console.log('filter :  ',filter);
        queryString += filter;
    }
    if(order != ""){
        console.log('order :  ',order);
        queryString += order;
    }
    if(groupBy != ""){
        console.log('groupBy :  ',groupBy);
        queryString += groupBy;
    }
    if(paggination != ""){
        console.log('paggination :  ',paggination);
        queryString += paggination;
    }

    return queryString;
}

export const Pagination = function(page, size){
    let paggination = "";
    if(page > 0){
        let skip = (page - 1) * size;
        paggination = `OFFSET ${skip} ROWS FETCH NEXT ${size} ROWS ONLY`;
    }
    return paggination;
}