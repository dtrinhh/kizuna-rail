import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion, getRoutesBySeason } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const routes = await getAllRoutes();
    const seasons = await getListOfSeasons();

    // variables for matching query parameters chosen
    const regionSort = req.query.region;
    const seasonSort = req.query.season;

    // variable since there is possible two sort functions to be applied
    let filteredRoutes;

    if (regionSort && seasonSort)
    {
        const regionFiltered = await getRoutesByRegion(regionSort);

        // Couldn't use getRoutesBySeason(season) as that pulls from the db, not the called for list
        filteredRoutes = regionFiltered.filter(route => 
            route.bestSeason.toLowerCase() === seasonSort.toLowerCase()
        );
    }

    else if (regionSort) {
        filteredRoutes = await getRoutesByRegion(regionSort);
    }
    else if (seasonSort) {
        filteredRoutes = await getRoutesBySeason(seasonSort);
    }
    else {
        filteredRoutes = await getAllRoutes();
    }
    
    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions: regions,
        routes: filteredRoutes,
        seasons: seasons,
        regionSort: regionSort,
        seasonSort: seasonSort
    });
};

