import { WeatherData } from 'src/typeorm/weatherdata.entity';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Weatherstation } from 'src/typeorm/weatherstation.entity';
import * as Promise from 'bluebird';

export default class WeatherDataSeeder implements Seeder {
  async run(
    datasource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const weatherdataFactory = factoryManager.get(WeatherData);
    const weatherdataRepository = datasource.getRepository(WeatherData);
    const weatherstationRepository = datasource.getRepository(Weatherstation);

    await weatherdataRepository.clear();

    const weatherstations = await weatherstationRepository.find();

    const concurrency = 50; // Adjust this number based on your system's capabilities more is faster but more resource intensive
    await Promise.map(
      weatherstations,
      async (station: Weatherstation) => {
        console.log(`Inserting weatherdata for station ${station.name}...`);
        const prevTemp = null;
        const prevWindspeed = null;
        const prevAirpressure = null;
        const prevPrecipitation = null;
        const data = await Promise.all(
          Array(10)
            .fill('')
            .map(async () => {
              const weatherdata = await weatherdataFactory.make();
              weatherdata.weatherstation = station;
              weatherdata.temp = prevTemp
                ? prevTemp + Math.random() * 2 - 1
                : Math.random() * 100 - 50;
              weatherdata.windspeed = prevWindspeed
                ? prevWindspeed + Math.random() * 2 - 1
                : Math.random() * 100;
              weatherdata.s_airpressure = prevAirpressure
                ? prevAirpressure + Math.random() * 2 - 1
                : Math.random() * 100;
              weatherdata.precipitation = prevPrecipitation
                ? prevPrecipitation + Math.random() * 2 - 1
                : Math.random() * 100;

              return weatherdata;
            }),
        );
        weatherdataRepository.insert(data);
      },
      { concurrency },
    );
  }
}
