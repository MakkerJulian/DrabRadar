import { WeatherData } from 'src/typeorm/weatherdata.entity';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Weatherstation } from 'src/typeorm/weatherstation.entity';

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

    weatherstations.forEach(async (station) => {
      let prevTemp = null;
      let prevWindspeed = null;
      let prevAirpressure = null;
      let prevPrecipitation = null;
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

            // Update the previous values for the next iteration
            prevTemp = weatherdata.temp;
            prevWindspeed = weatherdata.windspeed;
            prevAirpressure = weatherdata.s_airpressure;
            prevPrecipitation = weatherdata.precipitation;

            return weatherdata;
          }),
      );
      await weatherdataRepository.insert(data);
    });
  }
}
