import { getRouteById, getSchedulesByRoute, getCompleteRouteDetails} from '../../models/model.js';

export default async (req, res) => {
    const { routeId } = req.params;

    // Not needed as we grabbed completeRouteDetails
    // const details = await getRouteById(routeId);
    
    // TODO: getCompleteRouteDetails instead
    const completeRouteDetails = await getCompleteRouteDetails(routeId);

    res.render('routes/details', { 
        title: 'Route Details',
        details: completeRouteDetails,
    });
};